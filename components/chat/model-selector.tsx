import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Model {
  value: string;
  label: string;
}

interface ModelGroup {
  label: string;
  models: Model[];
}

const MODEL_GROUPS: ModelGroup[] = [
  {
    label: "超大模型",
    models: [
      { value: "gpt-4o", label: "GPT-4 Optimized" },
      { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet" },
      { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
    ],
  },
  {
    label: "实惠模型",
    models: [
      { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
      { value: "claude-3-haiku", label: "Claude 3 Haiku" },
      { value: "gpt-4o-mini", label: "GPT-4 Mini" },
    ],
  },
];

interface ModelSelectorProps {
  defaultValue?: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export default function ModelSelector({
  defaultValue,
  value,
  onValueChange,
  className = "w-full lg:w-[180px]",
}: ModelSelectorProps) {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="选择一个模型" />
      </SelectTrigger>
      <SelectContent>
        {MODEL_GROUPS.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.models.map((model) => (
              <SelectItem key={model.value} value={model.value}>
                {model.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
