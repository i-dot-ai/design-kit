-include .env
export


install:
	pnpm install

pre-commit-install:
	pre-commit install

run_frontend:
	pnpm --filter ./frontend dev 

run_unit_tests:
	pnpm --filter @i-dot-ai-npm/component-library-tests-unit test

install_e2e_browsers:
	pnpm --filter @i-dot-ai-npm/component-library-tests-e2e exec playwright install

run_e2e_tests:
	pnpm --filter @i-dot-ai-npm/component-library-tests-e2e test

run_e2e_a11y_tests:
	pnpm --filter @i-dot-ai-npm/component-library-tests-e2e exec playwright test '\.a11y\.'

run_e2e_behaviour_tests:
	pnpm --filter @i-dot-ai-npm/component-library-tests-e2e exec playwright test '\.behaviour\.'

run_e2e_snapshot_tests:
	pnpm --filter @i-dot-ai-npm/component-library-tests-e2e exec playwright test '\.snapshots\.'

run_all_tests: run_unit_tests run_e2e_tests

.PHONY: generate_aws_diagram
generate_aws_diagram:
	uv lock
	uv sync --group dev
	uv run python terraform/diagram_script.py

# ECR image tagging (used by the ECS/Terraform deploy path)

SERVICE_NAME=$(subst pipelines/,,$(service))
ECR_REPO_NAME=$(APP_NAME)-$(SERVICE_NAME)
ECR_URL=$(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_REGION).amazonaws.com
ECR_REPO_URL=$(ECR_URL)/$(ECR_REPO_NAME)

IMAGE_TAG=$$(git rev-parse HEAD)
IMAGE=$(ECR_REPO_URL):$(IMAGE_TAG)

docker_tag_is_present_on_image:
	aws ecr describe-images --repository-name $(repo) --image-ids imageTag=$(IMAGE_TAG) --query 'imageDetails[].imageTags' | jq -e '.[]|any(. == "$(tag)")' >/dev/null

check_docker_tag_exists:
	if ! make docker_tag_is_present_on_image tag=$(IMAGE_TAG) 2>/dev/null; then \
		echo "Error: ECR tag $(IMAGE_TAG) does not exist." && exit 1; \
	fi

docker_update_tag: ## Tag the docker image with the specified tag
	# repo and tag variable are set from git-hub core workflow. example: repo=ecr-repo-name, tag=dev
	if make docker_tag_is_present_on_image 2>/dev/null; then echo "Image already tagged with $(tag)" && exit 0; fi && \
	MANIFEST=$$(aws ecr batch-get-image --repository-name $(repo) --image-ids imageTag=$(IMAGE_TAG) --query 'images[].imageManifest' --output text) && \
	aws ecr put-image --repository-name $(repo) --image-tag $(tag) --image-manifest "$$MANIFEST"

## Terraform 

ifndef env
override env = default
endif
workspace = $(env)
tf_build_args =-var "image_tag=$(IMAGE_TAG)" -var-file="variables/global.tfvars" -var-file="variables/$(env).tfvars"  
TF_BACKEND_CONFIG=backend.hcl

tf_set_workspace:
	terraform -chdir=terraform/ workspace select $(workspace)

tf_new_workspace:
	terraform -chdir=terraform/ workspace new $(workspace)

tf_set_or_create_workspace:
	make tf_set_workspace || make tf_new_workspace

tf_init_and_set_workspace:
	make tf_init && make tf_set_or_create_workspace

.PHONY: tf_init
tf_init:
	terraform -chdir=./terraform/ init \
		-backend-config=$(TF_BACKEND_CONFIG) \
		-backend-config="dynamodb_table=i-dot-ai-$(env)-dynamo-lock" \
		-reconfigure \

.PHONY: tf_fmt
tf_fmt:
	terraform fmt

.PHONY: tf_plan
tf_plan:
	make tf_init_and_set_workspace && \
	terraform -chdir=./terraform/ plan ${tf_build_args} ${args}

.PHONY: tf_apply
tf_apply:
	make tf_init_and_set_workspace && \
	terraform -chdir=./terraform/ apply ${tf_build_args} ${args}

.PHONY: tf_auto_apply
tf_auto_apply:  ## Auto apply terraform
	make check_docker_tag_exists repo=$(ECR_REPO_NAME)
	make tf_init_and_set_workspace && \
	terraform -chdir=./terraform/ apply  ${tf_build_args} ${args} -auto-approve


## Release app
.PHONY: release
release: 
	chmod +x ./release.sh && ./release.sh $(env)


