/** @jsxImportSource solid-js */
import { Toggle, ToggleItem, ToggleLabel } from "@i-dot-ai-npm/component-library-solid";

export function ExampleToggle() {
    return (
        <ToggleItem>
            <Toggle id="t" />
            <ToggleLabel for="t">Enable</ToggleLabel>
        </ToggleItem>
    );
}
