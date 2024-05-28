<template>
    <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">All Customers</h1>
        <Button className="ml-auto" size="sm">
          Add customer
        </Button>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead className="max-w-[150px]">Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Total Orders</TableHead>
              <TableHead className="hidden md:table-cell">Last Order</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage alt="Olivia Martin" src="/placeholder-user.jpg" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Olivia Martin</TableCell>
              <TableCell className="hidden md:table-cell">olivia@example.com</TableCell>
              <TableCell className="hidden md:table-cell">12</TableCell>
              <TableCell className="hidden md:table-cell">February 20, 2022</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage alt="Ava Johnson" src="/placeholder-user.jpg" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Ava Johnson</TableCell>
              <TableCell className="hidden md:table-cell">ava@example.com</TableCell>
              <TableCell className="hidden md:table-cell">8</TableCell>
              <TableCell className="hidden md:table-cell">January 5, 2022</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage alt="Michael Johnson" src="/placeholder-user.jpg" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Michael Johnson</TableCell>
              <TableCell className="hidden md:table-cell">michael@example.com</TableCell>
              <TableCell className="hidden md:table-cell">5</TableCell>
              <TableCell className="hidden md:table-cell">August 3, 2021</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage alt="Lisa Anderson" src="/placeholder-user.jpg" />
                  <AvatarFallback>LA</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Lisa Anderson</TableCell>
              <TableCell className="hidden md:table-cell">lisa@example.com</TableCell>
              <TableCell className="hidden md:table-cell">7</TableCell>
              <TableCell className="hidden md:table-cell">July 15, 2021</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage alt="Samantha Green" src="/placeholder-user.jpg" />
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Samantha Green</TableCell>
              <TableCell className="hidden md:table-cell">samantha@example.com</TableCell>
              <TableCell className="hidden md:table-cell">9</TableCell>
              <TableCell className="hidden md:table-cell">June 5, 2021</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage alt="Adam Barlow" src="/placeholder-user.jpg" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Adam Barlow</TableCell>
              <TableCell className="hidden md:table-cell">adam@example.com</TableCell>
              <TableCell className="hidden md:table-cell">3</TableCell>
              <TableCell className="hidden md:table-cell">May 20, 2021</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Avatar>
                  <AvatarImage alt="Sophia Anderson" src="/placeholder-user.jpg" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">Sophia Anderson</TableCell>
              <TableCell className="hidden md:table-cell">sophia@example.com</TableCell>
              <TableCell className="hidden md:table-cell">23</TableCell>
              <TableCell className="hidden md:table-cell">November 2, 2021</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoveHorizontalIcon className="w-4 h-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
</template>