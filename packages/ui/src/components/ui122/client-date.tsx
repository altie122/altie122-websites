'use client';

import {useEffect, useState} from 'react';

interface Props {
    date: Date;
}

export function ClientDate({date}: Props) {
    const [formattedDate, setFormattedDate] = useState('');
    useEffect(() => {
        setFormattedDate(date.toLocaleString());
    }, [date]);
    return (
        <>
            {formattedDate}
        </>
    );
}
