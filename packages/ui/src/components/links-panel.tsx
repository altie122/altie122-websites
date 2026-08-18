import LinkCard from "@altie122/ui/components/link-card";
import type {Doc} from "@altie122/backend/convex/_generated/dataModel"

interface Props {
    entries?: Doc<"links">[]
}

export function LinkPanel({entries}: Props) {
    return (
        <div className="p-4 bg-card/50 text-card-foreground border-border border flex flex-col gap-4 shadow-xl">
            <div className="flex flex-col md:gap-2 items-center">
                <h1 className='text-6xl font-bold font-heading'>altie122</h1>
                <p>Check out some of my socials!</p>
            </div>
            {
                entries && (
                    <div
                        className='flex flex-row flex-wrap justify-center max-h-100 gap-4 scrollbar-thumb-accent overflow-y-scroll scroll-fade'>
                        {entries.sort((a) =>
                            a.type === "internal" ? -1 : 1,
                        ).map((link) => (
                            <LinkCard entry={link} key={link._id}/>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
