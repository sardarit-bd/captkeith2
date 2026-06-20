import { Award, Map, Plus, Weight, X } from 'lucide-react';
import { useState } from 'react';
import { ToggleField } from './platform-settings-shared';

function TaxonomyCard({ title, icon, iconClass, children, action }: any) {
    return (
        <section className="overflow-hidden rounded-2xl border border-[#e6ebf1] bg-white shadow-sm">
            <header className="flex items-center justify-between border-b border-[#e6ebf1] bg-slate-50/60 px-6 py-4">
                <div className="flex items-center">
                    <span className={`mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}>{icon}</span>
                    <h4 className="text-sm font-semibold text-[#35ADD5]">{title}</h4>
                </div>
                {action}
            </header>
            {children}
        </section>
    );
}

export function PlatformSettingsUscgTab({ data, setData }: { data: any, setData: any }) {
    const uscg = data.uscg;
    const setUscg = (updates: any) => setData('uscg', { ...uscg, ...updates });

    const [newEndorsement, setNewEndorsement] = useState('');

    const toggleLicenseType = (id: string) => {
        const updatedTypes = uscg.license_types.map((type: any) => type.id === id ? { ...type, enabled: !type.enabled } : type);
        setUscg({ license_types: updatedTypes });
    };

    const addTonnage = () => {
        const newTonnage = window.prompt('Enter new tonnage rating:');
        if (newTonnage && newTonnage.trim()) {
            setUscg({ tonnage_ratings: [...uscg.tonnage_ratings, newTonnage.trim()] });
        }
    };

    const removeTonnage = (rating: string) => {
        setUscg({ tonnage_ratings: uscg.tonnage_ratings.filter((r: string) => r !== rating) });
    };

    const addEndorsement = () => {
        if (newEndorsement.trim()) {
            setUscg({ geographic_endorsements: [...uscg.geographic_endorsements, newEndorsement.trim()] });
            setNewEndorsement('');
        }
    };

    const removeEndorsement = (index: number) => {
        const updated = uscg.geographic_endorsements.filter((_: string, i: number) => i !== index);
        setUscg({ geographic_endorsements: updated });
    };

    return (
        <div className="space-y-6">
            <div className="border-b border-[#e6ebf1] pb-4">
                <h3 className="text-xl font-semibold text-[#35ADD5]">USCG Compliance Taxonomy</h3>
                <p className="mt-1 text-sm text-slate-500">Manage dynamic dropdowns used during captain onboarding and vessel listing.</p>
            </div>

            <TaxonomyCard title="USCG License Types" icon={<Award className="h-4 w-4" />} iconClass="bg-blue-50 text-[#35ADD5]" action={<button type="button" className="inline-flex items-center text-sm font-medium text-[#35ADD5] transition-colors hover:text-[#35ADD5]"><Plus className="mr-1 h-4 w-4" />Add Type</button>}>
                <ul className="divide-y divide-slate-100">
                    {uscg.license_types.map((type: any) => (
                        <li key={type.id} className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-slate-50">
                            <div>
                                <p className="text-sm font-medium text-slate-800">{type.title}</p>
                                <p className="mt-0.5 text-xs text-slate-500">{type.description}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <ToggleField checked={type.enabled} onChange={() => toggleLicenseType(type.id)} />
                                <button type="button" className="text-slate-400 transition-colors hover:text-[#35ADD5]">Edit</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </TaxonomyCard>

            <TaxonomyCard title="Gross Tonnage Ratings" icon={<Weight className="h-4 w-4" />} iconClass="bg-emerald-50 text-emerald-600">
                <div className="p-6">
                    <div className="flex flex-wrap gap-2">
                        {uscg.tonnage_ratings.map((rating: string) => (
                            <span key={rating} className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                                {rating}
                                <button type="button" onClick={() => removeTonnage(rating)} className="ml-2 text-slate-400 transition-colors hover:text-red-500"><X className="h-3 w-3" /></button>
                            </span>
                        ))}
                        <button type="button" onClick={addTonnage} className="inline-flex items-center rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-sm text-[#35ADD5] transition-colors hover:bg-blue-50"><Plus className="mr-1 h-3 w-3" />Add Tonnage</button>
                    </div>
                </div>
            </TaxonomyCard>

            <TaxonomyCard title="Geographic Endorsements" icon={<Map className="h-4 w-4" />} iconClass="bg-orange-50 text-orange-600">
                <div className="space-y-4 p-6">
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={newEndorsement}
                            onChange={(e) => setNewEndorsement(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addEndorsement()}
                            placeholder="e.g. Great Lakes Endorsement" 
                            className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm transition-all focus:border-[#35ADD5] focus:outline-none focus:ring-2 focus:ring-[#35ADD5]/20" 
                        />
                        <button type="button" onClick={addEndorsement} className="rounded-lg bg-[#35ADD5] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800">Add</button>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                        {uscg.geographic_endorsements.map((endorsement: string, index: number) => (
                            <div key={endorsement} className={`flex items-center justify-between px-4 py-3 transition-colors hover:bg-slate-50 ${index !== uscg.geographic_endorsements.length - 1 ? 'border-b border-slate-100' : ''}`}>
                                <span className="text-sm font-medium text-slate-700">{endorsement}</span>
                                <button type="button" onClick={() => removeEndorsement(index)} className="text-slate-400 transition-colors hover:text-red-500"><X className="h-4 w-4" /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </TaxonomyCard>
        </div>
    );
}