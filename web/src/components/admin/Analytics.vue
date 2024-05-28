<template>
            <div className="flex items-center gap-4">
    <Button size="icon" variant="outline">
      <ArrowLeftIcon className="h-4 w-4" />
      <span className="sr-only">Back</span>
    </Button>
    <h1 className="font-semibold text-lg md:text-xl">Analytics</h1>
    <div className="ml-auto flex items-center gap-2">
      <Button className="hidden sm:flex" variant="outline">
        Today
      </Button>
      <Button className="hidden md:flex" variant="outline">
        This Month
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="w-[280px] justify-start text-left font-normal" id="date" variant="outline">
            <CalendarClockIcon className="mr-2 h-4 w-4" />
            June 01, 2023 - June 30, 2023
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto p-0">
          <Calendar initialFocus mode="range" numberOfMonths={2} />
        </PopoverContent>
      </Popover>
    </div>
  </div>
  <div className="grid gap-6">
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="flex flex-col">
        <CardHeader>
          <CardDescription>Total Sales</CardDescription>
          <CardTitle>$2389.00</CardTitle>
        </CardHeader>
        <CardContent>
          <StackedbarChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Sessions</CardDescription>
          <CardTitle>345</CardTitle>
        </CardHeader>
        <CardContent>
          <DotChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardDescription>Returning Customers</CardDescription>
          <CardTitle>33.5%</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupedbarChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="flex flex-col">
        <CardHeader>
          <CardDescription>Visitors</CardDescription>
          <CardTitle>3,456</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardDescription>Page Views</CardDescription>
          <CardTitle>12,345</CardTitle>
        </CardHeader>
        <CardContent>
          <LabelledpieChart className="aspect-[4/3]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Visitors</CardDescription>
          <CardTitle>Top Referrers</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center">
            <div>google.com</div>
            <div className="font-semibold ml-auto">3K</div>
          </div>
          <div className="flex items-center">
            <div>twitter.com</div>
            <div className="font-semibold ml-auto">1.2K</div>
          </div>
          <div className="flex items-center">
            <div>youtube.com</div>
            <div className="font-semibold ml-auto">1.1K</div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>