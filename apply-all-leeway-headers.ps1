# LEEWAY v11 Header Application Script - Complete Coverage
# Applies governance headers to ALL project files

$ErrorActionPreference = "Stop"
$basePath = "b:\Visu-Sewer Strategic Asset & Growth Deck"

Write-Host "🧠 Applying LEEWAY v11 Headers to ALL VisuSewer Files..." -ForegroundColor Cyan

# TSX/TS/JS Header Template
$tsxHeaderTemplate = @'
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
WHEN=2025-11-08;
HOW={HOW}
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
*/

'@

# HTML Header Template
$htmlHeaderTemplate = @'
<!-- LEEWAY HEADER
TAG: {TAG}
COLOR_ONION_HEX: NEON=#39FF14 FLUO=#0DFF94 PASTEL=#C7FFD8
ICON_FAMILY: lucide
ICON_GLYPH: {ICON}
ICON_SIG: CD534113
5WH: WHAT={WHAT};
WHY={WHY};
WHO=LeeWay Industries + VisuSewer;
WHERE={WHERE};
WHEN=2025-11-08;
HOW={HOW}
AGENTS: GEMINI, CLAUDE, GPT4, LLAMA
SPDX-License-Identifier: MIT
-->

'@

# Complete file mappings with metadata
$fileMappings = @{
    # Root application files
    "App.tsx" = @{
        TAG = "UI.APP.SURFACE"
        ICON = "presentation"
        WHAT = "Main application surface with deck navigator"
        WHY = "Orchestrate pitch presentation with progress tracking"
        HOW = "React + TypeScript + slide transitions"
    }
    "index.tsx" = @{
        TAG = "UI.APP.ENTRY"
        ICON = "zap"
        WHAT = "React application entry point with CSS imports"
        WHY = "Bootstrap React 19 + animations.css + ConsentScreen"
        HOW = "ReactDOM createRoot + StrictMode"
    }
    "index.html" = @{
        TAG = "UI.HTML.ENTRY"
        ICON = "file-code"
        WHAT = "SPA HTML entry point for Vite build"
        WHY = "Define viewport, meta tags, root div for React mount"
        HOW = "HTML5 with Vite script injection"
    }
    "types.ts" = @{
        TAG = "DATA.TYPES"
        ICON = "code"
        WHAT = "TypeScript type definitions for all deck entities"
        WHY = "Ensure type safety across pitch presentation components"
        HOW = "TS interfaces for DeckSection, FlagshipProject, OrgChart, etc."
    }
    "vite.config.ts" = @{
        TAG = "BUILD.CONFIG.VITE"
        ICON = "settings"
        WHAT = "Vite bundler configuration"
        WHY = "Configure React plugin and dev server for <200KB bundle target"
        HOW = "Vite 6.x with React 19 plugin"
    }
    
    # Components
    "components\Card.tsx" = @{
        TAG = "UI.COMPONENT.CARD"
        ICON = "square"
        WHAT = "Reusable card component with visual styling"
        WHY = "Provide consistent card UI across deck sections"
        HOW = "React + Tailwind CSS classes"
    }
    "components\charts.tsx" = @{
        TAG = "UI.COMPONENT.CHARTS"
        ICON = "bar-chart"
        WHAT = "Chart wrapper components for Recharts library"
        WHY = "Simplify chart rendering with consistent styling"
        HOW = "React + Recharts 2.x abstractions"
    }
    "components\DataTable.tsx" = @{
        TAG = "UI.COMPONENT.DATATABLE"
        ICON = "table"
        WHAT = "Data table component for structured data display"
        WHY = "Present tabular information in pitch deck"
        HOW = "React with sortable/filterable table logic"
    }
    "components\Icons.tsx" = @{
        TAG = "UI.COMPONENT.ICONS"
        ICON = "smile"
        WHAT = "SVG icon components (LightBulb, Shield, Rocket, etc.)"
        WHY = "Provide consistent iconography across service stack"
        HOW = "React functional components with SVG paths"
    }
    "components\ProjectDetails.tsx" = @{
        TAG = "UI.COMPONENT.PROJECTDETAILS"
        ICON = "file-text"
        WHAT = "Detailed project information display component"
        WHY = "Show expanded project data in case studies"
        HOW = "React with props-based content rendering"
    }
    "components\StatCard.tsx" = @{
        TAG = "UI.COMPONENT.STATCARD"
        ICON = "activity"
        WHAT = "Statistical card component for KPI display"
        WHY = "Highlight key metrics in human capital analytics"
        HOW = "React with numeric formatting and progress bars"
    }
    "components\TTSPlayer.tsx" = @{
        TAG = "UI.COMPONENT.TTSPLAYER"
        ICON = "volume-2"
        WHAT = "Text-to-Speech player controls component"
        WHY = "Provide audio playback UI for Agent Lee narration"
        HOW = "React + Browser SpeechSynthesis API integration"
    }
    
    # Hooks
    "utils\audio.ts" = @{
        TAG = "UTIL.AUDIO"
        ICON = "headphones"
        WHAT = "Audio utility functions for TTS management"
        WHY = "Centralize audio processing and voice selection logic"
        HOW = "Browser SpeechSynthesis API wrappers"
    }
}

# Function to add header to file
function Add-LeewayHeader {
    param(
        [string]$FilePath,
        [hashtable]$Metadata
    )
    
    # Skip if file already has LEEWAY HEADER
    $content = Get-Content -Path $FilePath -Raw -ErrorAction Stop
    if ($content -match "LEEWAY HEADER") {
        Write-Host "  ⏭️  Skipped (already has header): $FilePath" -ForegroundColor Yellow
        return
    }
    
    # Choose template based on file extension
    $extension = [System.IO.Path]::GetExtension($FilePath).ToLower()
    if ($extension -eq ".html") {
        $template = $htmlHeaderTemplate
    } else {
        $template = $tsxHeaderTemplate
    }
    
    # Replace placeholders
    $header = $template
    $header = $header -replace '\{TAG\}', $Metadata.TAG
    $header = $header -replace '\{ICON\}', $Metadata.ICON
    $header = $header -replace '\{WHAT\}', $Metadata.WHAT
    $header = $header -replace '\{WHY\}', $Metadata.WHY
    $header = $header -replace '\{WHERE\}', $FilePath -replace [regex]::Escape($basePath), "b:\Visu-Sewer Strategic Asset & Growth Deck"
    $header = $header -replace '\{HOW\}', $Metadata.HOW
    
    # Prepend header
    $newContent = $header + $content
    Set-Content -Path $FilePath -Value $newContent -Encoding UTF8 -NoNewline
    
    Write-Host "  ✓ Added LEEWAY header to $FilePath" -ForegroundColor Green
}

# Apply headers to all mapped files
$successCount = 0
$skippedCount = 0
$errorCount = 0

foreach ($file in $fileMappings.Keys) {
    $fullPath = Join-Path $basePath $file
    
    if (Test-Path $fullPath) {
        try {
            Add-LeewayHeader -FilePath $fullPath -Metadata $fileMappings[$file]
            $successCount++
        } catch {
            Write-Host "  ❌ Error processing $file : $_" -ForegroundColor Red
            $errorCount++
        }
    } else {
        Write-Host "  ⚠️  File not found: $fullPath" -ForegroundColor DarkYellow
        $skippedCount++
    }
}

Write-Host "`n📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✅ Successfully added: $successCount" -ForegroundColor Green
Write-Host "  ⏭️  Skipped (already had header): $skippedCount" -ForegroundColor Yellow
Write-Host "  ❌ Errors: $errorCount" -ForegroundColor Red
Write-Host "`n🎯 LEEWAY v11 compliance: Headers applied!" -ForegroundColor Magenta
