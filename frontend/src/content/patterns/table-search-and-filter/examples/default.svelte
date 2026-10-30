<script>
  import {
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    Link,
    Checkboxes,
    CheckboxItem,
    CheckboxInput,
    CheckboxLabel,
    ButtonGroup,
    Button,
  } from "@i-dot-ai-npm/component-library-svelte";
</script>

<TableSearchAndFilter>
  <FormGroup class="govuk-!-width-three-quarters">
    <InputLabel for="search">Search</InputLabel>
    <Input id="search" name="search" subtle />
  </FormGroup>
  <FormGroup>
    <InputLabel for="filter">Filter</InputLabel>
    <Select id="filter" name="filter" subtle>
      <SelectOption value="1">Option 1</SelectOption>
      <SelectOption value="2" selected>Option 2</SelectOption>
      <SelectOption value="3" disabled>Option 3</SelectOption>
    </Select>
  </FormGroup>
</TableSearchAndFilter>

<Table summary subtle>
  <TableHead>
    <TableRow>
      <TableHeader>Select</TableHeader>
      <TableHeader>Title</TableHeader>
      <TableHeader>Date</TableHeader>
      <TableHeader>Actions</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>
        <Checkboxes small subtle>
          <CheckboxItem>
            <CheckboxInput id="item-1" name="item-1" value="item-1" />
            <CheckboxLabel>
              <span class="govuk-visually-hidden">Select item 1</span>
            </CheckboxLabel>
          </CheckboxItem>
        </Checkboxes>
      </TableCell>
      <TableCell stretch>
        <Link href="#" noVisitedState>Item 1</Link>
      </TableCell>
      <TableCell noWrap small>12 Aug, 11:45</TableCell>
      <TableCell noWrap>
        <ButtonGroup>
          <Button small tertiary href="#">Rename</Button>
          <Button small tertiary href="#">Export</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>
        <Checkboxes small subtle>
          <CheckboxItem>
            <CheckboxInput id="item-2" name="item-2" value="item-2" />
            <CheckboxLabel>
              <span class="govuk-visually-hidden">Select item 2</span>
            </CheckboxLabel>
          </CheckboxItem>
        </Checkboxes>
      </TableCell>
      <TableCell stretch>
        <Link href="#" noVisitedState>Item 2</Link>
      </TableCell>
      <TableCell noWrap small>11 Aug, 11:45</TableCell>
      <TableCell noWrap>
        <ButtonGroup>
          <Button small tertiary href="#">Rename</Button>
          <Button small tertiary href="#">Export</Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>
