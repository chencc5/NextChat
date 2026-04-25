import { useMemo } from "react";
import { useAccessStore, useAppConfig } from "../store";
import { collectModelsWithDefaultModel } from "./model";

export function useAllModels() {
  const accessStore = useAccessStore();
  const configStore = useAppConfig();
  const models = useMemo(() => {
    // Fully-auto model discovery: ignore CUSTOM_MODELS so that whatever the
    // upstream /v1/models returns (merged into configStore.models) is shown
    // verbatim. DEFAULT_MODEL is still honored via accessStore.defaultModel.
    return collectModelsWithDefaultModel(
      configStore.models,
      "",
      accessStore.defaultModel,
    );
  }, [
    accessStore.customModels,
    accessStore.defaultModel,
    configStore.customModels,
    configStore.models,
  ]);

  return models;
}
