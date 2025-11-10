# Apply LEEWAY Headers to VisuSewer Project
# Based on LeeWay Standards v11

$projectRoot = "b:\Visu-Sewer Strategic Asset & Growth Deck"
$date = Get-Date -Format "yyyy-MM-dd"

# Define header template
$tsxHeader = @"
/* LEEWAY HEADER
TAG: {TAG}
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: {ICON}
ICON_SIG: CD534113
5WH: WHAT={WHAT};
WHY={WHY};
WHO=LeeWay Industries + VisuSewer;
WHERE={WHERE};
WHEN=$date;
HOW={HOW}
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

"@

# File mappings with metadata
$fileMappings = @{
    "components\Chatbot.tsx" = @{
        TAG = "UI.COMPONENT.CHATBOT"
        ICON = "message-square"
        WHAT = "AI Strategic Analyst Chatbot with Agent Lee"
        WHY = "Provide interactive Q&A during pitch presentation"
        HOW = "React + Gemma LLM + Browser SpeechSynthesis"
    }
    "components\Deck.tsx" = @{
        TAG = "UI.COMPONENT.DECK"
        ICON = "layers"
        WHAT = "Slide deck renderer with section routing"
        WHY = "Display 16 presentation slides with transitions"
        HOW = "React + TypeScript + content type switching"
    }
    "components\ConsentScreen.tsx" = @{
        TAG = "UI.COMPONENT.CONSENT"
        ICON = "shield-check"
        WHAT = "Data consent and privacy notice"
        WHY = "Ethical AI usage disclosure and user consent"
        HOW = "React + LocalStorage consent tracking"
    }
    "hooks\useTTS.ts" = @{
        TAG = "UI.HOOK.TTS"
        ICON = "volume-2"
        WHAT = "Text-to-Speech hook with voice selection"
        WHY = "Enable Agent Lee narration with natural female voices"
        HOW = "Browser SpeechSynthesis API + voice management"
    }
    "components\visuals\Metrics.tsx" = @{
        TAG = "UI.VISUAL.METRICS"
        ICON = "bar-chart-2"
        WHAT = "Human Capital Analytics dashboard"
        WHY = "Visualize workforce KPIs with Recharts"
        HOW = "React + Recharts PieChart + animated progress bars"
    }
    "constants.ts" = @{
        TAG = "DATA.CONSTANTS.DECK"
        ICON = "database"
        WHAT = "Pitch deck content and narrative data"
        WHY = "Centralize all 16 slide contents and narratives"
        HOW = "TypeScript typed data structures"
    }
    "gemma.js" = @{
        TAG = "AI.MODEL.GEMMA"
        ICON = "brain"
        WHAT = "Gemma LLM integration for Agent Lee"
        WHY = "Power AI chat responses locally in browser"
        HOW = "Xenova Transformers + LaMini-Flan-T5-248M"
    }
}

Write-Host "🧠 Applying LEEWAY v11 Headers to VisuSewer Project..." -ForegroundColor Green

foreach ($file in $fileMappings.Keys) {
    $fullPath = Join-Path $projectRoot $file
    
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Check if already has LEEWAY header
        if ($content -match "LEEWAY HEADER") {
            Write-Host "✓ $file already has LEEWAY header" -ForegroundColor Yellow
            continue
        }
        
        $metadata = $fileMappings[$file]
        $header = $tsxHeader -replace '{TAG}', $metadata.TAG `
                              -replace '{ICON}', $metadata.ICON `
                              -replace '{WHAT}', $metadata.WHAT `
                              -replace '{WHY}', $metadata.WHY `
                              -replace '{HOW}', $metadata.HOW `
                              -replace '{WHERE}', $fullPath
        
        # Prepend header
        $newContent = $header + $content
        Set-Content -Path $fullPath -Value $newContent -NoNewline
        
        Write-Host "✓ Added LEEWAY header to $file" -ForegroundColor Green
    } else {
        Write-Host "✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n✅ LEEWAY headers applied successfully!" -ForegroundColor Green
Write-Host "Next: Run inline style fixes for remaining components" -ForegroundColor Cyan
