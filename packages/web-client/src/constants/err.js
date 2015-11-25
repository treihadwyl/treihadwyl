/**
 * Creates custom errors and error heirarchies
 */

import { create } from 'errno'

export const DispatchError = create( 'DispatchError' )
export const StateError = create( 'StateError' )
