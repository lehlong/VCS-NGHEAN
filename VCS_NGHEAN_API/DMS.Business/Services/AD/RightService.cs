using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Services.AD
{
    public interface IRightService : IGenericService<tblAdRight, tblRightDto>
    {
        Task<tblRightDto> BuildDataForTree();
        Task UpdateOrderTree(tblRightDto moduleDto);
    }
    public class RightService : GenericService<tblAdRight, tblRightDto>, IRightService
    {
        public RightService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<tblRightDto> BuildDataForTree()
        {
            var lstNode = new List<tblRightDto>();
            var rootNode = new tblRightDto() { Id = "R", PId = "-R", Name = "Danh sách quyền trong hệ thống" };
            lstNode.Add(rootNode);

            var lstAllRight = (await this.GetAll()).OrderBy(x => x.OrderNumber).ToList();
            foreach (var right in lstAllRight)
            {
                var node = new tblRightDto() { Id = right.Id, Name = right.Name, PId = right.PId,IsChecked = right.IsChecked,OrderNumber = right.OrderNumber };
                lstNode.Add(node);
            }
            var nodeDict = lstNode.ToDictionary(n => n.Id);
            foreach (var item in lstNode)
            {
                tblRightDto parentNode = null;
                if (item.PId == "-R" || !nodeDict.TryGetValue(item.PId, out parentNode))
                {
                    continue;
                }

                if (parentNode.Children == null)
                {
                    parentNode.Children = new List<tblRightDto>();
                }
                parentNode.Children.Add(item);
            }
            return rootNode;
        }

        public async Task UpdateOrderTree(tblRightDto moduleDto)
        {
            try
            {
                var lstModuleDto = new List<tblRightDto>();
                var lstModuleUpdate = new List<tblAdRight>();

                this.ConvertNestedToList(moduleDto, ref lstModuleDto);
                if (moduleDto.Children == null || moduleDto.Children.Count == 0)
                {
                    return;
                }
                var numberOrder = 1;
                foreach (var item in lstModuleDto)
                {
                    var module = _mapper.Map<tblAdRight>(item);
                    module.OrderNumber = numberOrder++;
                    lstModuleUpdate.Add(module);
                }
                this._dbContext.UpdateRange(lstModuleUpdate);
                await this._dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        private void ConvertNestedToList(tblRightDto node, ref List<tblRightDto> lstNodeFlat)
        {
            if (node.Id != "R")
            {
                lstNodeFlat.Add(node);
            }
            if (node.Children != null && node.Children.Count > 0)
            {
                foreach (var item in node.Children)
                {
                    ConvertNestedToList(item, ref lstNodeFlat);
                }
            }
        }

    }
}
