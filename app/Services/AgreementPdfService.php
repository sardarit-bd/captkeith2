<?php

namespace App\Services;

use App\Models\CharterEvent;
use App\Models\CharterHireAgreement;
use App\Models\CaptainProfile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AgreementPdfService
{
    /**
     * @return string  The private-disk path where the PDF was stored.
     */
    public function generateBareboatAgreement(CharterEvent $event): string
    {
        $charterer = $event->charterer;
        $vessel    = $event->vessel;
        $owner     = $vessel->owner;

        $data = [
            'agreementDate'   => now()->format('F j, Y'),
            'ownerName'       => $owner?->full_name ?? 'Vessel Owner',
            'chartererName'   => $charterer?->full_name ?? '—',
            'chartererAddress' => implode(', ', array_filter([
                $charterer?->address,
                $charterer?->city,
                $charterer?->state,
                $charterer?->zip_code,
            ])) ?: '—',
            'vesselName'      => $vessel->name ?? '—',
            'officialNumber'  => $vessel->official_number ?? '—',
            'charterDate'     => $event->charter_date?->format('F j, Y') ?? '—',
            'startTime'       => $event->start_time ?? '—',
            'endDate'         => $event->charter_date?->format('F j, Y') ?? '—',
            'endTime'         => '—',
            'rentalAmount'    => '—',
            'depositAmount'   => '—',
            'cleaningFee'     => '—',
            'county'          => $vessel->marina_state ?? '—',
            'state'           => $vessel->marina_state ?? '—',
        ];

        $html = $this->renderBareboatHtml($data);
        return $this->savePdf($html, $event->id, 'bareboat-charter-agreement');
    }

    /*
     *
     * @return string  The private-disk path where the PDF was stored.
     */
    public function generateCaptainHireAgreement(CharterEvent $event, CaptainProfile $captain): string
    {
        $charterer = $event->charterer;
        $vessel    = $event->vessel;

        $data = [
            'agreementDate'      => now()->format('F j, Y'),
            'chartererName'      => $charterer?->full_name ?? '—',
            'chartererAddress'   => implode(', ', array_filter([
                $charterer?->address,
                $charterer?->city,
                $charterer?->state,
                $charterer?->zip_code,
            ])) ?: '—',
            'chartererPhone'     => $charterer?->phone ?? '—',
            'captainName'        => $captain->full_name ?? '—',
            'captainLicense'     => $captain->license_number ?? '—',
            'captainPhone'       => $captain->phone ?? '—',
            'vesselName'         => $vessel->name ?? '—',
            'charterDates'       => $event->charter_date?->format('F j, Y') ?? '—',
            'captainFee'         => $captain->hourly_rate
                ? '$' . number_format($captain->hourly_rate, 2) . '/hr'
                : '—',
        ];

        $html = $this->renderCaptainHireHtml($data);
        $slug = 'captain-hire-' . Str::slug($captain->full_name ?? $captain->id);
        return $this->savePdf($html, $event->id, $slug);
    }



    private function savePdf(string $html, string $eventId, string $slug): string
    {
        $pdf  = $this->htmlToPdf($html);
        $path = "agreements/{$eventId}/{$slug}.pdf";
        Storage::disk('local')->put($path, $pdf);
        return $path;
    }


    private function htmlToPdf(string $html): string
    {
        if (class_exists(\Barryvdh\DomPDF\Facade\Pdf::class)) {
            $instance = \Barryvdh\DomPDF\Facade\Pdf::loadHTML($html)
                ->setPaper('letter', 'portrait');
            return $instance->output();
        }

        if (class_exists(\Dompdf\Dompdf::class)) {
            $dompdf = new \Dompdf\Dompdf();
            $dompdf->loadHtml($html);
            $dompdf->setPaper('letter', 'portrait');
            $dompdf->render();
            return $dompdf->output();
        }

        throw new \RuntimeException(
            'No PDF library found. Please install barryvdh/laravel-dompdf: ' .
                'composer require barryvdh/laravel-dompdf'
        );
    }



    private function renderBareboatHtml(array $d): string
    {
        $css = $this->sharedCss();

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>{$css}</style>
</head>
<body>
<div class="page">

  <h1 class="doc-title">BAREBOAT/DEMISE CHARTER AGREEMENT</h1>

  <p class="intro">
    MADE this {$d['agreementDate']} by and between
    <strong>{$d['ownerName']}</strong>, hereinafter referred to as <strong>OWNER</strong>,
    and <strong>{$d['chartererName']}</strong> of {$d['chartererAddress']}
    hereinafter referred to as the <strong>CHARTERER</strong>.
  </p>

  <p>
    WHEREAS, OWNER is the owner or agent for the owner of that certain yacht
    <strong>{$d['vesselName']}</strong> (Official Number: {$d['officialNumber']}),
    which is hereinafter described as the Yacht, and which includes all equipment,
    fixtures and other property delivered to CHARTERER with said Yacht; AND WHEREAS,
    CHARTERER wishes to charter said Yacht from the OWNER.
  </p>

  <p>NOW THEREFORE, in consideration of the foregoing, the mutual covenants contained
  herein, and the sums paid and to be paid in accordance herewith, the OWNER agrees to
  let and the CHARTERER agrees to hire the yacht upon the terms and conditions set forth below:</p>

  <h2>1. TERM</h2>
  <p>
    The term of the charter shall commence at <strong>{$d['startTime']}</strong>
    on <strong>{$d['charterDate']}</strong> and shall end at <strong>{$d['endTime']}</strong>
    on <strong>{$d['endDate']}</strong>.
  </p>

  <h2>2. RENTAL</h2>
  <p>
    The total rent to be paid by the CHARTERER to the OWNER is <strong>{$d['rentalAmount']}</strong>
    in US Dollars. The full amount of which shall be paid no later than 30 days prior to
    delivery. A security and damage deposit of <strong>{$d['depositAmount']}</strong> shall be paid
    by the CHARTERER to the OWNER prior to delivery. If Charterer elects to hire a Captain
    preapproved by The Walston Group Inc., the deposit requirement shall be waived.
  </p>

  <h2>3. DELIVERY AND REDELIVERY</h2>
  <p>
    The OWNER agrees to deliver the yacht in full commission and in proper working order,
    outfitted as a yacht of her size, type and accommodations, with full equipment, inclusive
    of that required by law, and fully furnished. If the yacht is not redelivered in a clean
    condition, CHARTERER will be charged <strong>{$d['cleaningFee']}</strong> for cleaning,
    which will be deducted from security and damage deposit.
  </p>

  <h2>4. NAVIGATION LIMITS</h2>
  <p>
    The OWNER does not guarantee any destinations. The navigational limits of the Yacht are
    determined by the Yacht's insurance policy, thus the CHARTERER agrees to restrict the
    cruising of the Yacht to those permitted by the Yacht's insurance policy.
  </p>

  <h2>5. INSURANCE</h2>
  <p>
    The OWNER agrees to keep the Yacht insured against Fire, Marine and Collision risks, and
    with Protection and Indemnity coverage, for the term of this charter. In addition, an
    insurance policy through vQuip insurance agency will be in effect when a CHARTERER pays
    the premium in full. This policy provides 3rd party liability coverage up to \$50,000
    per occurrence and does not cover damage done to the vessel.
  </p>

  <h2>6. ACCIDENTS</h2>
  <p>
    CHARTERER bears the risk of any loss of use resulting from his act, default, negligence
    and/or poor judgment. Should the Yacht sustain breakdown of machinery due to a major system
    breakdown not caused by the CHARTERER, and such breakdown prevents use for not less than
    forty-eight (48) consecutive hours, the OWNER shall make pro-rata return of the rent for
    such excess period.
  </p>

  <h2>7. REPLACEMENTS</h2>
  <p>
    The CHARTERER agrees to be responsible for and to replace or make good any injury to the
    Yacht, her equipment or furnishings, caused personally by himself or any of his party.
    CHARTERER acknowledges that damage caused by engine overheating is not covered by insurance
    and that all repair costs from overheating shall be the full responsibility of the CHARTERER.
    If the CHARTERER hires a Captain preapproved by the Owner, the OWNER shall not hold CHARTERER
    responsible for damages incurred from the Captain's operation of the Yacht.
  </p>

  <h2>8. LIENS AND REPAIRS</h2>
  <p>
    Neither the CHARTERER nor anyone acting upon his behalf has the right or power to permit
    or suffer the creation of any maritime liens against the Yacht. The CHARTERER agrees to
    indemnify the OWNER for any charges or losses in connection therewith, including reasonable
    attorney's fees.
  </p>

  <h2>9. RUNNING EXPENSES</h2>
  <p>
    The CHARTERER agrees to pay all running expenses during the term of the charter, including
    fuel, water, dockage, pilotage, port charges, provisions, supplies, and other consumable
    stores for himself and his party.
  </p>

  <h2>10. INDEMNIFICATION</h2>
  <p>
    The CHARTERER agrees to indemnify and save the OWNER harmless from any and all liabilities
    for loss or damage to third persons and their property occasioned by the negligence or
    default of the CHARTERER, except to the extent that any such liability is covered by the
    OWNER's insurance.
  </p>

  <h2>11. SWIMMING</h2>
  <p>
    The OWNER and the insurance underwriters of the Yacht accept no responsibility or liability
    for accidents, injuries or death due to swimming or entering the water. CHARTERER affirms
    that they are assuming all risk and liability caused by swimming or entering the water,
    including injury and death.
  </p>

  <h2>12. RESTRICTED USE</h2>
  <p>
    The CHARTERER agrees that the Yacht shall be employed exclusively as a recreational pleasure
    vessel. The Yacht shall not be used to transport merchandise or carry passengers for pay or
    to engage in any trade whatsoever, nor shall it be used in any way which violates the laws
    of the United States or any other jurisdiction.
  </p>

  <h2>13. SMUGGLING</h2>
  <p>
    Federal and state laws prohibit the use of any vessel for the transport or possession of any
    drugs or controlled substances. CHARTERER agrees not to bring any illegal drugs aboard the Yacht.
  </p>

  <h2>14. ASSIGNMENT AND SUBCHARTER</h2>
  <p>
    The CHARTERER agrees not to assign this Agreement or sub-charter the Yacht without the
    written consent of the OWNER.
  </p>

  <h2>15. CANCELLATIONS</h2>
  <p>
    If CHARTERER cancels more than thirty days prior to his/her date of departure, the OWNER
    will refund all monies received less a \$350.00 administrative fee. Cancellation less than
    thirty days before the date of departure will result in the forfeiture of all monies received.
  </p>

  <h2>16. CHARTERER'S AUTHORITY OVER CREW</h2>
  <p>
    It is agreed that full authority regarding the operation and management of the Yacht is
    hereby transferred to the CHARTERER for the term hereof. Any Captain and/or crew members
    utilized are agents and employees of the CHARTERER and not the OWNER. The Captain shall
    handle clearance and the normal running of the Yacht, subject to the limitations of this
    Agreement.
  </p>

  <h2>17. BAREBOAT CHARTER</h2>
  <p>
    This charter shall at all times be construed as a bareboat/demise charter. It is the
    intention of the OWNER to completely and exclusively relinquish possession, command, control,
    management, and navigation of the Yacht to the CHARTERER. CHARTERER assumes all responsibility
    for any injury, death, property damage, or other claim that may arise during the period of
    the charter or at any time when the vessel is in the custody and control of the CHARTERER.
  </p>

  <h2>18. CONSTRUCTION</h2>
  <p>
    This Agreement was made in the County of {$d['county']} in the State of {$d['state']}.
    It shall be interpreted and enforced in accordance with the laws of said state.
    This Agreement contains the entire agreement between the parties and supersedes all
    previous agreements, memoranda and understandings. This Agreement may be amended only
    by written document signed by both parties.
  </p>

  <div class="signature-section">
    <h2>IN WITNESS WHEREOF</h2>
    <p>The parties have placed their hands and seals this day and year first above written.</p>

    <div class="sig-row">
      <div class="sig-block">
        <div class="sig-line"></div>
        <p class="sig-label">OWNER: {$d['ownerName']}</p>
        <p class="sig-label">Date: ___________________________</p>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <p class="sig-label">CHARTERER: {$d['chartererName']}</p>
        <p class="sig-label">Date: ___________________________</p>
      </div>
    </div>
  </div>

</div>
</body>
</html>
HTML;
    }

    private function renderCaptainHireHtml(array $d): string
    {
        $css = $this->sharedCss();

        return <<<HTML
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>{$css}</style>
</head>
<body>
<div class="page">

  <h1 class="doc-title">INDEPENDENT CAPTAIN FOR HIRE AGREEMENT</h1>

  <p class="intro">
    This Independent Captain for Hire Agreement ("Agreement") is entered into on
    <strong>{$d['agreementDate']}</strong>, by and between:
  </p>

  <table class="party-table">
    <tr>
      <td><strong>Charterer:</strong></td>
      <td>{$d['chartererName']}</td>
    </tr>
    <tr>
      <td><strong>Address:</strong></td>
      <td>{$d['chartererAddress']}</td>
    </tr>
    <tr>
      <td><strong>Phone/Email:</strong></td>
      <td>{$d['chartererPhone']}</td>
    </tr>
    <tr><td colspan="2">&nbsp;</td></tr>
    <tr>
      <td><strong>Captain:</strong></td>
      <td>{$d['captainName']}</td>
    </tr>
    <tr>
      <td><strong>USCG License No.:</strong></td>
      <td>{$d['captainLicense']}</td>
    </tr>
    <tr>
      <td><strong>Phone/Email:</strong></td>
      <td>{$d['captainPhone']}</td>
    </tr>
  </table>

  <h2>1. PURPOSE</h2>
  <p>
    This Agreement is entered into in connection with a separately executed Bareboat Charter
    Agreement for the vessel <strong>{$d['vesselName']}</strong> for charter date(s)
    <strong>{$d['charterDates']}</strong>. The Charterer has independently selected and
    hired the Captain named above to operate the vessel during the charter period.
  </p>

  <h2>2. INDEPENDENT CONTRACTOR STATUS</h2>
  <p>
    The Captain is an independent contractor and is not an employee, agent, or representative
    of the vessel owner or charter company. The Captain shall be solely responsible for
    compliance with all applicable maritime laws, licensing requirements, and safe vessel operation.
  </p>

  <h2>3. AUTHORITY OF CAPTAIN</h2>
  <p>
    The Captain shall have final authority regarding the safe navigation, operation, and
    management of the vessel, including but not limited to weather conditions, passenger safety,
    routing, speed, anchoring, docking, alcohol consumption, and any activity affecting the
    safety of the vessel or persons aboard. The Charterer and guests agree to comply with all
    lawful instructions of the Captain.
  </p>

  <h2>4. RIGHT OF DISMISSAL</h2>
  <p>
    The Charterer shall retain the right to dismiss the Captain and/or crew at any time,
    with or without cause, provided such dismissal is conducted safely and in compliance with
    applicable law. In the event of dismissal, the Charterer assumes full responsibility for
    securing a replacement qualified captain acceptable under the Bareboat Charter Agreement.
    Likewise, the Captain reserves the right to terminate the voyage or refuse service if unsafe,
    unlawful, or hazardous conditions exist.
  </p>

  <h2>5. NO PASSENGER FOR HIRE REPRESENTATION</h2>
  <p>The Charterer attests and affirms that:</p>
  <ul>
    <li>The Charterer is the sole charterer of the vessel;</li>
    <li>No guest aboard has paid money or provided any consideration, direct or indirect,
        for transportation or participation in the voyage;</li>
    <li>The charter is private in nature and is not being conducted as a passenger-for-hire operation.</li>
  </ul>

  <h2>6. CAPTAIN COMPENSATION</h2>
  <table class="party-table">
    <tr>
      <td><strong>Captain's Fee:</strong></td>
      <td>{$d['captainFee']}</td>
    </tr>
    <tr>
      <td><strong>Crew Compensation:</strong></td>
      <td>As agreed between parties</td>
    </tr>
    <tr>
      <td><strong>Recommended Gratuity:</strong></td>
      <td>15–20%</td>
    </tr>
    <tr>
      <td><strong>Payment Terms:</strong></td>
      <td>As specified in the booking arrangement</td>
    </tr>
  </table>

  <h2>7. HOLD HARMLESS</h2>
  <p>
    The Charterer agrees to hold harmless and indemnify the Captain from claims arising from
    the actions of the Charterer or guests aboard, except in cases of gross negligence or
    willful misconduct by the Captain.
  </p>

  <h2>8. ENTIRE AGREEMENT</h2>
  <p>
    This Agreement constitutes the entire understanding between the parties regarding the
    Captain's services and may only be modified in writing signed by both parties.
  </p>

  <div class="signature-section">
    <div class="sig-row">
      <div class="sig-block">
        <div class="sig-line"></div>
        <p class="sig-label">CHARTERER: {$d['chartererName']}</p>
        <p class="sig-label">Date: ___________________________</p>
      </div>
      <div class="sig-block">
        <div class="sig-line"></div>
        <p class="sig-label">CAPTAIN: {$d['captainName']}</p>
        <p class="sig-label">Date: ___________________________</p>
      </div>
    </div>
  </div>

</div>
</body>
</html>
HTML;
    }

    private function sharedCss(): string
    {
        return <<<CSS
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
    font-family: "Times New Roman", Times, serif;
    font-size: 11pt;
    color: #1a1a1a;
    line-height: 1.55;
}
.page {
    padding: 54pt 60pt 54pt 60pt;
}
.doc-title {
    text-align: center;
    font-size: 14pt;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    margin-bottom: 18pt;
    border-bottom: 2pt solid #35ADD5;
    padding-bottom: 8pt;
}
.intro {
    margin-bottom: 12pt;
}
p {
    margin-bottom: 10pt;
    text-align: justify;
}
h2 {
    font-size: 11pt;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 14pt;
    margin-bottom: 5pt;
    color: #35ADD5;
}
ul {
    margin: 6pt 0 10pt 20pt;
}
ul li {
    margin-bottom: 4pt;
}
.party-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 14pt;
}
.party-table td {
    padding: 3pt 6pt;
    vertical-align: top;
}
.party-table td:first-child {
    width: 160pt;
    white-space: nowrap;
}
.signature-section {
    margin-top: 30pt;
    padding-top: 20pt;
    border-top: 1pt solid #ccc;
}
.signature-section h2 {
    margin-bottom: 8pt;
}
.sig-row {
    display: table;
    width: 100%;
    margin-top: 24pt;
}
.sig-block {
    display: table-cell;
    width: 48%;
    padding-right: 4%;
    vertical-align: top;
}
.sig-block:last-child {
    padding-right: 0;
    padding-left: 4%;
}
.sig-line {
    border-bottom: 1pt solid #333;
    height: 32pt;
    margin-bottom: 6pt;
}
.sig-label {
    font-size: 10pt;
    margin-bottom: 6pt;
}
CSS;
    }
}
