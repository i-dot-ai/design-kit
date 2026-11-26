import { Avatar, AvatarGroup } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <div class="component-container--inverse">
      <AvatarGroup class="iai-avatar-group--inverse">
        <Avatar fullName="Anthony Joshua" />
        <p class="govuk-body">Anthony Joshua</p>
      </AvatarGroup>
      <br />
      <Avatar fullName="Anthony Joshua" inverse />
    </div>
  );
}
