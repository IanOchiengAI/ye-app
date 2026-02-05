import { notFound } from 'next/navigation';
import { getModuleById, CORE_MODULES } from '@/lib/data/modules';
import ModuleClient from './ModuleClient';

// Required for Static Export (GitHub Pages)
export async function generateStaticParams() {
    return CORE_MODULES.map((module) => ({
        id: module.id,
    }));
}

interface ModuleDetailPageProps {
    params: {
        id: string;
    };
}

export default function ModuleDetailPage({ params }: ModuleDetailPageProps) {
    // This runs on the server (or during build)
    const activeModule = getModuleById(params.id);

    if (!activeModule) {
        notFound();
    }

    // Pass data to Client Component
    return <ModuleClient activeModule={activeModule} />;
}
