import { getPagination, paginate } from './pagination';

describe('paginate', () => {
  test('returns correct page with a full page size', () => {
    const originArray = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11'];
    const pageSize = 3;
    const currentPage = 2;

    const displayArray = paginate(originArray, pageSize, currentPage);
    expect(displayArray).toMatchObject(['test4', 'test5', 'test6']);
  });
  
  test('returns correct page for last page', () => {
    const originArray = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10', 'test11'];
    const pageSize = 3;
    const currentPage = 4;

    const displayArray = paginate(originArray, pageSize, currentPage);
    expect(displayArray).toMatchObject(['test10', 'test11']);
  });
});

describe('getPagination', () => {
  test('returns correct pagination with 1 set of ... on right', () => {
    const totalCount = 789;
    const pageSize = 100;
    const currentPage = 2;

    const displayArray = getPagination(totalCount, pageSize, currentPage);
    expect(displayArray).toMatchObject([1, 2, 3, 4, 5, '...', 8]);
  });

  test('returns correct pagination with 1 set of ... on left', () => {
    const totalCount = 789;
    const pageSize = 100;
    const currentPage = 6;

    const displayArray = getPagination(totalCount, pageSize, currentPage);
    expect(displayArray).toMatchObject([1, '...', 4, 5, 6, 7, 8]);
  });
  
  test('returns correct pagination with 2 sets of ...', () => {
    const totalCount = 789;
    const pageSize = 100;
    const currentPage = 4;

    const displayArray = getPagination(totalCount, pageSize, currentPage);
    expect(displayArray).toMatchObject([1, '...', 3, 4, 5, '...', 8]);
  });
});
