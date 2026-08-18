import * as os from "node:os";

export function getLocalIps(): string[] {
    if (process.env.NODE_ENV === "development") {
        const interfaces = os.networkInterfaces();

        return Object.values(interfaces)
            .flat()
            .filter(
                (
                    network,
                ): network is os.NetworkInterfaceInfo =>
                    network !== undefined &&
                    network.family === "IPv4" &&
                    !network.internal,
            )
            .map((network) => network.address);
    } else {
        return [];
    }
}
