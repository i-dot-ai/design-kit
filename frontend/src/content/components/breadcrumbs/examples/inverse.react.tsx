import { Breadcrumbs, BreadcrumbItem } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <div className="component-container--inverse">
      <Breadcrumbs inverse>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Section</BreadcrumbItem>
        <BreadcrumbItem href="#">Sub-section</BreadcrumbItem>
        <BreadcrumbItem href="#">Sub Sub-section</BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
}
