export interface SnapStatistics {
    totalLines: number;
    targetsFound: number;
    linesDeleted: number;
    deletionRate: number;
}

export interface SnapResult {
    success: boolean;
    statistics: SnapStatistics;
    error?: string;
}
