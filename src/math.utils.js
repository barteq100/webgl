export function isPowerOf2(v: number): boolean
{
    return (v != 0) && ((v & (v - 1)) == 0);
}