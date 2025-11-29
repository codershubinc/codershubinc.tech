"use client";

import React, { useEffect, useState } from 'react';
import { formatCreationDate } from '@/lib/utils';

interface RelativeTimeProps {
    date: string;
    initial?: string;
}

export default function RelativeTime({ date, initial }: RelativeTimeProps) {
    const [display, setDisplay] = useState(initial || '');

    useEffect(() => {
        const value = formatCreationDate(date);
        setDisplay(value);
    }, [date]);

    return <span suppressHydrationWarning>{display}</span>;
}
