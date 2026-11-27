import { Avatar, AvatarGroup } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <AvatarGroup>
      <Avatar size="small" fullName="Anthony Joshua" />
      <Avatar fullName="Anthony Joshua" />
      <Avatar size="large" fullName="Anthony Joshua" />
    </AvatarGroup>
  );
}
