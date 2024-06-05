"use client";
import { useCallback, useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { useLoadedRepo } from "@/hooks/zustand-store-fluffy";
import { set } from "zod";

// Define the interface types
interface ServiceList {
  serviceKey: "commandrplus" | "gpt4" | "llama3" | "gemini";
  serviceName: string;
}

// Predefined service list
const llms: ServiceList[] = [
  // {
  //   serviceKey: "commandrplus",
  //   serviceName: "Cohere Command R+",
  // },
  {
    serviceKey: "gpt4",
    serviceName: "GPT 4",
  },
  // {
  //   serviceKey: "llama3",
  //   serviceName: "Llama 3",
  // },
];

const defaultService: ServiceList = {
    serviceKey: "gpt4",
    serviceName: "GPT 4",
  };
  

const ServiceListProps = ({ repoUrl }: { repoUrl?: string }) => {
  const [open, setOpen] = useState(false);
  const [serviceList, setServiceList] = useState<ServiceList[]>(llms);
  const [selectedService, setSelectedService] = useState<ServiceList>(defaultService);
  const { setServiceKey } = useLoadedRepo();

  const handleSelectService = useCallback(
    (service: ServiceList) => {
      setSelectedService(service);
      setServiceKey(service.serviceKey);
    },
    [setServiceKey]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Select a service"
          aria-expanded={open}
          className="flex-1 justify-between rounded-lg md:max-w-[300px] lg:max-w-[400px]"
        >
          {selectedService ? selectedService.serviceName : "Select a service..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start" forceMount={true}>
        <Command>
          <CommandInput placeholder="Search services..." />
          <CommandEmpty>No service found.</CommandEmpty>
          <CommandGroup>
            {serviceList.map((service) => (
              <CommandItem
                key={service.serviceKey}
                onSelect={() => {
                  handleSelectService(service);
                  setOpen(false);
                }}
              >
                {service.serviceName}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedService?.serviceKey === service.serviceKey
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ServiceListProps;