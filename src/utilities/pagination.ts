function paginate(array: Array<any>, pageSize: number, currentPage: number): Array<any> {
  return array.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}

function getPageSize(): number {
  return 100;
}

function getRange(from: number, to: number) {
  const length = to - from + 1;
  return Array.from({ length }, (_, index) => index + from);
};

function getPagination(totalCount: number, pageSize: number, currentPage: number) {
  const totalPageCount = Math.ceil(totalCount / pageSize);
  const totalDisplayPageCount = 6;

  if (totalDisplayPageCount >= totalPageCount) {
    return getRange(1, totalPageCount);
  }
  const leftSiblingIndex = Math.max(currentPage - 1, 1);
  const rightSiblingIndex = Math.min(
    currentPage + 1,
    totalPageCount
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 5;
    let leftRange = getRange(1, leftItemCount);
    return [...leftRange, '...', totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 5;
    let rightRange = getRange(
      totalPageCount - rightItemCount + 1,
      totalPageCount
    );
    return [firstPageIndex, '...', ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = getRange(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
  }
}

export { paginate, getPageSize, getPagination }