import { Toggle, ToggleItem, ToggleLabel } from "@i-dot-ai-npm/component-library-react";

export function ExampleToggle() {
    return (
        <ToggleItem>
            <Toggle id="t" />
            <ToggleLabel htmlFor="t">Enable</ToggleLabel>
        </ToggleItem>
    );
}
