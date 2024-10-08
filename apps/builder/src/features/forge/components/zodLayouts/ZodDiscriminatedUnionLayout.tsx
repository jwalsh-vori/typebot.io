import { DropdownList } from "@/components/DropdownList";
import type { ForgedBlockDefinition } from "@typebot.io/forge-repository/definitions";
import type { ForgedBlock } from "@typebot.io/forge-repository/schemas";
import { isDefined } from "@typebot.io/lib/utils";
import type { z } from "@typebot.io/zod";
import { ZodObjectLayout } from "./ZodObjectLayout";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const ZodDiscriminatedUnionLayout = ({
  discriminant,
  data,
  schema,
  dropdownPlaceholder,
  blockDef,
  blockOptions,
  onDataChange,
}: {
  discriminant: string;
  data: any;
  schema: z.ZodDiscriminatedUnion<string, z.ZodObject<any>[]>;
  dropdownPlaceholder: string;
  blockDef?: ForgedBlockDefinition;
  blockOptions?: ForgedBlock["options"];
  onDataChange: (value: string) => void;
}) => {
  const currentOptions = data?.[discriminant]
    ? schema._def.optionsMap.get(data?.[discriminant])
    : undefined;
  return (
    <>
      <DropdownList
        currentItem={data?.[discriminant]}
        onItemSelect={(item) => onDataChange({ ...data, [discriminant]: item })}
        items={
          [...schema._def.optionsMap.keys()].filter((key) =>
            isDefined(key),
          ) as string[]
        }
        placeholder={dropdownPlaceholder}
      />
      {currentOptions && (
        <ZodObjectLayout
          schema={currentOptions}
          data={data}
          blockDef={blockDef}
          blockOptions={blockOptions}
          onDataChange={onDataChange}
        />
      )}
    </>
  );
};
