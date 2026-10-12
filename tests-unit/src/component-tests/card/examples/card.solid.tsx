/** @jsxImportSource solid-js */
import { Card, CardGroup, CardIcon, CardHeading, CardContent, CardLink } from "@i-dot-ai-npm/component-library-solid";

export function ExampleCard() {
    return (
        <CardGroup>
            <Card>
                <CardIcon></CardIcon>
                <CardHeading>Heading</CardHeading>
                <CardContent>Content</CardContent>
                <CardLink href="/x">Link</CardLink>
            </Card>
        </CardGroup>
    );
}
