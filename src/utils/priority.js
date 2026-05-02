// higher number = higher priority
const weights = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export function getTopN(notifications, n = 10) {
  return [...notifications]
    .filter(item => !item.read)
    .sort((a, b) => {
      const diff = (weights[b.Type] || 0) - (weights[a.Type] || 0);
      if (diff !== 0) return diff;
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, n);
}