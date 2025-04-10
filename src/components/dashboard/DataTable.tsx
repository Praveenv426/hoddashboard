
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Column<T> {
  key: keyof T | 'actions';
  header: string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T>({ 
  columns, 
  data, 
  isLoading = false, 
  emptyMessage = "No data available" 
}: DataTableProps<T>) {
  return (
    <div className="rounded-md border border-border/30 overflow-hidden">
      <Table>
        <TableHeader className="bg-adminhub-background/50">
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key as string} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, index) => (
              <TableRow key={index} className="hover:bg-adminhub-background/50">
                {columns.map((column) => (
                  <TableCell key={`${index}-${column.key as string}`} className={column.className}>
                    {column.cell ? column.cell(row) : row[column.key as keyof T] as React.ReactNode}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
