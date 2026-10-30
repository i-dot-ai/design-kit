import { CardGroup, Card, CardHeading, CardLink, CardContent } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <CardGroup>
      <Card>
        <CardHeading>
          <h3 className="govuk-heading-m">
            <CardLink href="#">Dashboard</CardLink>
          </h3>
        </CardHeading>
        <CardContent>
          <p className="govuk-body-s">See the state of everything in one place.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeading>
          <h3 className="govuk-heading-m">
            <CardLink href="#">Reports</CardLink>
          </h3>
        </CardHeading>
        <CardContent>
          <p className="govuk-body-s">Generate and download service reports.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeading>
          <h3 className="govuk-heading-m">
            <CardLink href="#">Settings</CardLink>
          </h3>
        </CardHeading>
        <CardContent>
          <p className="govuk-body-s">Manage your account and preferences.</p>
        </CardContent>
      </Card>
    </CardGroup>
  );
}
