// Format numbers over 1000 with commas and add 'k'
export function formatNumber(num: number): string {
    return num > 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
    }