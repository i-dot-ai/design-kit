import { Avatar, AvatarGroup } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <div className="component-container--inverse">
      <AvatarGroup class="iai-avatar-group--inverse">
        <Avatar fullName="Anthony Joshua" />
        <p className="govuk-body">Anthony Joshua</p>
      </AvatarGroup>
      <br />
      <Avatar fullName="Anthony Joshua" inverse />
    </div>
  );
}
