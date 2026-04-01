export type FilterType = {
    q?: string;
    limit?: number;
    skip?: number;
    categories?: string[];
    needsRevision?: boolean;
    sortColumn?: 'title' | 'createdAt';
    sortDirection?: 'asc' | 'desc';
}