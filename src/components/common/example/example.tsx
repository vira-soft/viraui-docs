import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import type { ReactNode } from "react";

type ExampleProps = {
  /** Live sandbox / demo — default tab. */
  preview: ReactNode;
  /** Static code fence(s) for the Code tab. */
  children: ReactNode;
};

const panelClass =
  "p-0 [&>figure:only-child]:m-0 [&>figure:only-child]:rounded-none";

/** Preview / Code switch for Common examples — each instance keeps its own tab state. */
export function Example({ preview, children }: ExampleProps) {
  return (
    <Tabs items={["Preview", "Code"]}>
      <Tab value="Preview" className={panelClass}>
        {preview}
      </Tab>
      <Tab value="Code" className={panelClass}>
        {children}
      </Tab>
    </Tabs>
  );
}
