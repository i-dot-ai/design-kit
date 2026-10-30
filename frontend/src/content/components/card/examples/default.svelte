<script>
  import { CardGroup, Card, CardHeading, CardLink, CardContent } from "@i-dot-ai-npm/component-library-svelte";
</script>

<CardGroup>
  <Card>
    <CardHeading>
      <h3 class="govuk-heading-m">
        <CardLink href="#">Dashboard</CardLink>
      </h3>
    </CardHeading>
    <CardContent>
      <p class="govuk-body-s">See the state of everything in one place.</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeading>
      <h3 class="govuk-heading-m">
        <CardLink href="#">Reports</CardLink>
      </h3>
    </CardHeading>
    <CardContent>
      <p class="govuk-body-s">Generate and download service reports.</p>
    </CardContent>
  </Card>
  <Card>
    <CardHeading>
      <h3 class="govuk-heading-m">
        <CardLink href="#">Settings</CardLink>
      </h3>
    </CardHeading>
    <CardContent>
      <p class="govuk-body-s">Manage your account and preferences.</p>
    </CardContent>
  </Card>
</CardGroup>
