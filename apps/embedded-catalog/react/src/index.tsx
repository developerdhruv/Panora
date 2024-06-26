import "./global.css";
import PanoraIntegrationCard, { ProviderCardProp } from "./components/PanoraIntegrationCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PanoraDynamicCatalog, { DynamicCardProp } from "./components/PanoraDynamicCatalog";


const PanoraProviderCard = ({name, category, projectId, returnUrl, linkedUserId, optionalApiUrl}: ProviderCardProp) => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
          <PanoraIntegrationCard name={name} category={category} projectId={projectId} returnUrl={returnUrl} linkedUserId={linkedUserId} optionalApiUrl={optionalApiUrl}  />
      </QueryClientProvider>
    )
}

const PanoraDynamicCatalogCard = ({projectId, returnUrl, linkedUserId, category, optionalApiUrl} : DynamicCardProp) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <PanoraDynamicCatalog  projectId={projectId} returnUrl={returnUrl} linkedUserId={linkedUserId} category={category} optionalApiUrl={optionalApiUrl}  />
    </QueryClientProvider>
  )

}

export {PanoraProviderCard,PanoraDynamicCatalogCard};
