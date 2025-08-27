interface TimeFormat {
  hour: number;
  minute: number;
}

const normalizeHour = (hour: number, isPm: boolean): number => {
  if (isPm && hour < 12) {
    return hour + 12;
  }
  if ((!isPm && hour === 12) || hour === 24) {
    return 0;
  }
  if (hour > 24 && hour < 30) {
    return -1;
  }
  return hour;
};

const normalizeMinute = (minute: number): number => {
  if (minute >= 60) {
    return 0;
  }
  return minute;
};

export const parseTimeInput = (input: string): null | TimeFormat => {
  let cleanedInput = input.trim().toLowerCase();
  let isPm = false;

  // 오전/오후 처리 -> 오전 222, 오후 222 이런거 처리해야 함(8/26/새벽)
  if (/^(pm|오후)/.test(cleanedInput)) {
    isPm = true;
    cleanedInput = cleanedInput.replace(/^(pm|오후)/, '').trim();
  } else if (cleanedInput.startsWith('am') || cleanedInput.startsWith('오전')) {
    cleanedInput = cleanedInput.replace(/^(am|오전)/, '').trim();
  }

  // 콜론이 있는 경우
  let match = cleanedInput.match(/^(\d{1,2}):(\d{1,2})$/);
  if (match) {
    const hour = normalizeHour(parseInt(match[1], 10), isPm) ?? NaN;
    const minute = normalizeMinute(parseInt(match[2], 10));

    if (hour < 0) {
      return null;
    }

    return { hour, minute };
  }

  // 콜론이 없는 경우
  match = cleanedInput.match(/^\d+$/);
  if (match) {
    let hour = 0;
    let minute = 0;

    if (cleanedInput.length <= 2) {
      hour = normalizeHour(parseInt(cleanedInput, 10), isPm) ?? NaN;
      if (hour >= 30) {
        minute = Math.floor(hour % 10);
        hour = Math.floor(hour / 10);
      }
    } else if (cleanedInput.length === 3) {
      // 앞 2자리가 시간
      hour = normalizeHour(parseInt(cleanedInput.slice(0, 2), 10), isPm) ?? NaN;
      minute = normalizeMinute(parseInt(cleanedInput.slice(2), 10));
      // 앞 2자리가 시간이 맞으면 바로 리턴
      if (hour <= 23 && minute <= 59) {
        return { hour, minute };
      }

      // 앞 1자리가 시간
      hour = normalizeHour(parseInt(cleanedInput[0], 10), isPm) ?? NaN;
      minute = normalizeMinute(parseInt(cleanedInput.slice(1), 10));
    } else {
      // 앞 1-2자리로 시간(Hour) 결정
      hour = normalizeHour(parseInt(cleanedInput.slice(0, 2), 10), isPm) ?? NaN;
      if (hour >= 30) {
        hour = Math.floor(hour / 10);
      }

      // 마지막 2자리로 분(Minute) 결정
      minute = normalizeMinute(parseInt(cleanedInput.slice(-2), 10));
    }

    if (hour < 0 || hour > 23) {
      return null;
    }
    return { hour, minute };
  }
  return null;
};
