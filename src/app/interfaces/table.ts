export interface tableProps {
  columns: { field: string; header: string }[];
  data: any[];
  paginationLinks?: {
    first: string;
    prev: string;
    next: string;
    last: string;
  };
  onSelectingRow: (id: number) => void;
  selectedRow: any[];
  handleEdit?: (id: number) => void;
  handleDelete?: (id: number) => void;
  handleView?: (id: number) => void;
  setCurrentDataLink?: (link: string) => void;
  handleApprove?: (id: number) => void;
  handleReject?: (id: number) => void;
  selectAllRow: (data: any[]) => void;
  handelCancel?: (id: number) => void;
  isSelectAll: boolean;
}
