export const DEFAULT_PAGINATION = {
  pageSize: 5,
  current: 1,
  showSizeChanger: true,
  showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total}`,
  pageSizeOptions: ['5', '10', '20', '50'],
  hideOnSinglePage: false,
  showQuickJumper: false,
  size: 'default'
}
