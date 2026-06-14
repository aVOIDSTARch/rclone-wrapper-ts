// Generic command builder for shell commands

// Types used in this project

export interface RootCommand {
  name: string;
  description: string;
  usage_example?: string;
  format_string?: CmdFormatString;
  subcommands?: RootCommand[];
  options?: CommandOption[];
  help_text?: string;
}

export interface FullCommand {
  name: string;
  description: string;
  cmd_string_with_options_and_args: string;
}

export interface SubCommand {
  name: string;
  description: string;
  parent_command: RootCommand | SubCommand;
  usage_example?: string;
  format_string?: CmdFormatString;
  root_cmd_options?: CommandOption[];
  sub_cmd_options?: CommandOption[];
  help_text?: string;
}

export interface CommandOption {
  name: string;
  description: string;
  option_short?: string;
  option_long: string;
  options_category?: string;
  has_value: boolean;
  default_value?: string;
  arguments?: Argument[];
  help_text?: string;
};

export interface Argument {
  name: string;
  description: string;
  required: boolean;
  args?: string[];
  is_enum?: boolean;
  arg_enums?: string[];
  defaultValue?: string;
  help_text?: string;
}

export interface CmdFormatString {
  cmd_alias: string,
  description: string,
  format_string: string;
}

export interface CommandMap {
  cmdName: string,
  cmdFamilyDescription: string,
  rootCmd: RootCommand,
  allSubCmds?: SubCommand[],
  allCmdOptions?: CommandOption[],
  allCmdArgs?: Argument[],
  savedCmdFmtStrings?: CmdFormatString[];
  builder?: CmdBuilder
  last_updated: Date
}

export interface CommandLibrary {
  name: string,
  description: string,
  cmdCatalog: Record<string, string> // Command Name and Description
  commandCollection: CommandMap[],
  last_updated: Date
}

export interface CmdBuilder {

  buildRootCommand(
    root_cmd: RootCommand,
    root_cmd_options?: CommandOption[],
    sub_command?: SubCommand[],
  ): FullCommand;

  buildSubCommand(
    subCmd: SubCommand,
    sub_cmd_options?: CommandOption[]
  ): SubCommand;

  buildOption(
    option: CommandOption,
    option_arguments?: Argument[]
  ): CommandOption[];

  buildArgument(
    arg: Argument,
    arg_values?: string[]
  ): Argument[];

  buildFromFormatString(format: CmdFormatString): FullCommand;

  buildFormatStringFromCmd(fullCmd: FullCommand): CmdFormatString;

  isValidCmdString(fullCmd: FullCommand): boolean;

}

export interface LibraryController {

  insertCmdMap(map: CommandMap, library: CommandLibrary): boolean;

  updateCmdMap(mapName: string, library: CommandLibrary): boolean;

  deleteCmdMap(mapName: string, library: CommandLibrary): boolean;

  listCommands(library: CommandLibrary): string[];

  getCmdMapLastUpdated(mapName: string, library: CommandLibrary): Date;

  getLibraryLastUpdated(libraryName: string, library: CommandLibrary): Date;

  getLibrariesList(dirName: string): string[];
}
