import type { Repository } from "./types";

/**
 * Calculates the top 5 most forked repositories
 * @param repositories Array of repository data from GitHub API
 * @returns Array of objects containing repository names and their fork counts
 * Example return: [{ repo: "react", count: 1000 }, { repo: "vue", count: 500 }]
 * We will sort depending on amount of forks, and limit to 5 repos
 */

export const calculateMostForkedRepos = (
  repositories: Repository[]
): { repo: string; count: number }[] => {
  if (repositories.length === 0) return [];
  const tempForkedRepos = repositories.map((repo) => {
    return {
      repo: repo.name,
      count: repo.forkCount,
    };
  });
  type QuickSortRepos = {
    repo: string;
    count: number;
  };
  // Just for kicks, I will use Quick Sorting algorithm
  function quickSort(arr: QuickSortRepos[]): QuickSortRepos[] {
    // Base case - if we only have 1 item in the list theny return
    if (arr.length <= 1) return arr;
    // Identifying pivot
    const pivot = arr[arr.length - 1];
    const left: QuickSortRepos[] = [];
    const right: QuickSortRepos[] = [];
    // Looping through array, and
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].count > pivot.count) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    // Desc sorting. quickSort(left) Returns a sorted array of items bigger than the pivot, and vice versa. Pivot is a single value to be placed in the middle. Without the spread operator, you'd accidentally create a nested array
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  const forkedRepos = quickSort(tempForkedRepos);
  return forkedRepos.slice(0, 5);
};

/**
 * Calculates the top 5 most starred repositories
 * @param repositories Array of repository data from GitHub API
 * @returns Array of objects containing repository names and their star counts
 * Example return: [{ repo: "tensorflow", stars: 5000 }, { repo: "linux", stars: 4000 }]
 */

export const calculateMostStarredRepos = (
  repositories: Repository[]
): { repo: string; stars: number }[] => {
  if (repositories.length === 0) return [];
  const tempStarredRepos = repositories.map((item) => {
    return {
      repo: item.name,
      stars: item.stargazerCount,
    };
  });
  type StarredSort = {
    repo: string;
    stars: number;
  };
  function quickSort(array: StarredSort[]): StarredSort[] {
    // Set base case
    if (array.length <= 1) return array;
    const pivot: StarredSort = array[array.length - 1];
    const left: StarredSort[] = [];
    const right: StarredSort[] = [];
    // Start looping
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i].stars > pivot.stars) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }
    //   Recursion case
    return [...quickSort(left), pivot, ...quickSort(right)];
  }
  const starredRepos = quickSort(tempStarredRepos).slice(0, 5);
  return starredRepos;
};
/**
 * Calculates the top 5 most used programming languages across all repositories
 * @param repositories Array of repository data from GitHub API
 * @returns Array of objects containing language names and their occurrence count
 * Example return: [{ language: "JavaScript", count: 10 }, { language: "Python", count: 7 }]
 */
export const calculateMostUsedLang = (
  repositories: Repository[]
): { language: string; count: number }[] => {
  // create empty object to count how many times each language appears
  const languageMap: { [key: string]: number } = {};

  repositories.forEach((repo) => {
    if (repo.languages.edges.length === 0) return;
    //   Loop over each language. Get its name, and inc value or languageMap + 1, if doesn't exist, start from 0.
    repo.languages.edges.forEach((lang) => {
      const { name } = lang.node;
      languageMap[name] = (languageMap[name] || 0) + 1;
    });
  });
  // if no languages were FlaskRound, return empty array
  if (Object.keys(languageMap).length === 0) return [];
  // turn map into an array-like [["JavaScript", 10], ["TypeScript", 5]], and sort it so the most used comes first, and take top 5, and convert each pair into an object of { language, count }
  return Object.entries(languageMap)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([language, count]) => {
      return { language, count };
    });
};
