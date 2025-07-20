import { formatWithOptions } from 'date-fns/fp'
import { ko } from 'date-fns/locale'

const formatKo = formatWithOptions({ locale: ko })

export const formatTemplates = {
    '01/01(월) 00:00': formatKo('MM/dd(E) HH:mm'),
    '01/01(월)': formatKo('MM/dd(E)'),
    '2025년 1월': formatKo('yyyy년 M월'),
    '오전 12:00': formatKo('aaaa h:mm')
}