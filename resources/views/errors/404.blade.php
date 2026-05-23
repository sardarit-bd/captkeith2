<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>404 - Page Not Found</title>

    <link rel="icon" href="/logo1.svg" type="image/svg+xml">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">

    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Poppins', sans-serif; }
        .brand-font { font-family: 'Playfair Display', serif; }
    </style>
</head>
<body class="bg-[#f8fafc] min-h-screen flex flex-col items-center justify-center px-4">

    <div class="text-center max-w-lg">

        <!-- Logo -->
        <div class="flex justify-center mb-8">
            <img src="/logo1.svg" alt="Logo" class="h-12 w-auto">
        </div>

        <!-- 404 Number -->
        <h1 class="brand-font text-[120px] font-bold leading-none text-[#0a273f] opacity-10 select-none">
            404
        </h1>

        <!-- Message -->
        <div class="-mt-6">
            <h2 class="brand-font text-3xl font-semibold text-[#0a273f] mb-3">
                Page Not Found
            </h2>
            <p class="text-[#6b7280] text-base mb-8">
                The page you are looking for doesn't exist or has been moved.
            </p>
        </div>

        <!-- Button -->
        <a
            href="/"
            class="inline-flex items-center gap-2 bg-[#0a273f] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-[#123651] transition-colors shadow-sm"
        >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
        </a>

    </div>

</body>
</html>