import type {Digit} from '../types';

/**
 * Return Status Union - Errors
 * - `U`: Unauthenticated | Equal to `401 Unauthorized`
 * - `F`: Forbidden | Equal to `403 Forbidden`
 * - `N`: Not found | Prefer `S` with `data: null` | Equal to `404 Not Found`
 * - `C`: Conflict | Equal to `409 Conflict`
 * - `E`: Generic expected error
 * - `UNEX`: Unexpected error | `message` Must contain the error message from `catch (e)`
 * - `ES4**E`|`ES5**E`: Other 400/500 code
 */
export type ErrorStatuses =
    'U' |
    'F' |
    'N' |
    'C' |
    'E' |
    'UNEX' |
    `ES${4 | 5}${Digit}${Digit}E`

/**
 * Return Status Union - Successes
 * - `S`: Success | Equal to `200 OK`
 * - `SC`: Created | Equal to `201 Created`
 * - `SS2**E`: Other 200 code
 */
export type SuccessStatuses =
    'S' |
    'SC' |
    `SS2${Digit}${Digit}E`

export type Statuses = SuccessStatuses | ErrorStatuses;
