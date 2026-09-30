import * as Alert from '@altie122/ui/components/alert.tsx';

interface Props {
    title: string;
    type: 'Warning' | 'Info' | 'Caution' | undefined;
    children: React.ReactNode;
}

export function Banner({title, type = 'Info', children}: Props) {
    const description = children;
    if (type === 'Warning') {
        return (
            <Alert.Alert variant="destructive">
                <Alert.AlertTitle>{title}</Alert.AlertTitle>
                <Alert.AlertDescription>{description}</Alert.AlertDescription>
            </Alert.Alert>
        );
    } else if (type === 'Info') {
        return (
            <Alert.Alert>
                <Alert.AlertTitle>{title}</Alert.AlertTitle>
                <Alert.AlertDescription>{description}</Alert.AlertDescription>
            </Alert.Alert>
        );
    } else if (type === 'Caution') {
        return (
            <Alert.Alert variant="caution">
                <Alert.AlertTitle>{title}</Alert.AlertTitle>
                <Alert.AlertDescription>{description}</Alert.AlertDescription>
            </Alert.Alert>
        );
    }
}
