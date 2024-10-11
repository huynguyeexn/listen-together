import { SWRConfiguration } from "swr";

const SWR_CONFIG: SWRConfiguration = {
  refreshInterval: 0,
  fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
};

export default SWR_CONFIG;
