import type { IaiVariant } from "../../iai-variants-helpers/variants";

export const iaiAvatarVariants: IaiVariant[] = [
    { name: "small", props: { size: "small" }, expectClass: "iai-avatar--small" },
    { name: "large", props: { size: "large" }, expectClass: "iai-avatar--large" },
    { name: "inverse", props: { inverse: true }, expectClass: "iai-avatar--inverse" },
];
