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
  description: string;
}

interface ModelGroup {
  label: string;
  models: Model[];
}

const MODEL_GROUPS: ModelGroup[] = [
  {
    label: "高级模型",
    models: [
      {
        value: "gpt-4o",
        label: "GPT-4 Optimized",
        description: "最强大的GPT模型，适合复杂任务",
      },
      {
        value: "claude-3-5-sonnet",
        label: "Claude 3.5 Sonnet",
        description: "Anthropic的高级模型，擅长分析和创作",
      },
      {
        value: "gemini-1.5-pro",
        label: "Gemini 1.5 Pro",
        description: "Google的顶级模型，多模态能力强",
      },
    ],
  },
  {
    label: "快速模型",
    models: [
      {
        value: "gemini-1.5-flash",
        label: "Gemini 1.5 Flash",
        description: "Gemini的快速版本，适合简单任务",
      },
      {
        value: "claude-3-haiku",
        label: "Claude 3 Haiku",
        description: "Claude的轻量版，响应迅速",
      },
      {
        value: "gpt-4o-mini",
        label: "GPT-4 Mini",
        description: "GPT-4的精简版，平衡性能和速度",
      },
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
              <SelectItem
                key={model.value}
                value={model.value}
                title={model.description}
              >
                {model.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
