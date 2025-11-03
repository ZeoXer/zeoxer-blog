import { AdminAssetsCard } from "./admin-assets-card";

export const AdminAssetsList = ({ assets }: { assets: R2Object[] }) => {
  return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {assets.map((asset) => (
          <AdminAssetsCard key={asset.etag} asset={asset} />
        ))}
      </div>
  );
};
