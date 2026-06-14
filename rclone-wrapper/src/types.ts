// Types used in this project

export interface RcloneCommand {
  name: string;
  description: string;
  usage_example: string;
  format_string: string;
  options: RcloneCmdOption[];
}

export type RcloneCmdOption = {
  name: string;
  description: string;
  option_short: string;
  option_long: string;
  options_category: string;
  has_value: boolean;
  default_value?: string;
  arguments?: RcloneArgument[];
  argument_values?: string[];
};

export interface RcloneArgument {
  name: string;
  description: string;
  required: boolean;
  args?: string[];
  arg_enums?: string[];
  defaultValue?: string;
}

type RcloneBackendType = 'local' | 'remote' | 'cloud';

export interface RcloneBackend {
  type: RcloneBackendType;
  name: string;
  description: string;
  config: Record<string, any>;
}

export interface RcloneBackendsList  {
  backends: RcloneBackend[];
}
