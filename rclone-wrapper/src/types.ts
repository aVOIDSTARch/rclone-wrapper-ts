// Types used in this project



type RcloneBackendType = 'local' | 'remote' | 'cloud';

export interface RcloneBackend {
  type: RcloneBackendType;
  name: string;
  description: string;
  config: Record<string, any>;
}

export interface RcloneBackendsLibrary  {
  backends: RcloneBackend[];
}
