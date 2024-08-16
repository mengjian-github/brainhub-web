import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ModelSelectorProps {
  defaultValue: string;
  value: string;
  onValueChange: (value: string) => void;
}

export default function ModelSelector({
  defaultValue,
  value,
  onValueChange,
}: ModelSelectorProps) {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="选择一个模型" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>超大模型</SelectLabel>
          <SelectItem value="gpt-4o">gpt-4o</SelectItem>
          <SelectItem value="claude-3-5-sonnet">claude-3-5-sonnet</SelectItem>
          <SelectItem value="gemini-1.5-pro">gemini-1.5-pro</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>实惠模型</SelectLabel>
          <SelectItem value="gemini-1.5-flash">gemini-1.5-flash</SelectItem>
          <SelectItem value="claude-3-haiku">claude-3-haiku</SelectItem>
          <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
